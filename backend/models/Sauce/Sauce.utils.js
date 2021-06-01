async function canAccess(userId, sauceId) {
    const model = this;

    const findedSauce = await model.findById(sauceId);
    const existSauce = (findedSauce !== null);

    if (!existSauce)
        throw Error();
    
    const userIdSauce = findedSauce.userId; 
    const canAccess = userId === userIdSauce;

    if (!canAccess)
        throw Error();

    return findedSauce;
}

async function likeSauce(userId, id, like) {
    const model = this;
    const findedSauce = await model.findById(id);
    const existSauce = (findedSauce !== null);
    const validLike = [-1, 0, 1].includes(like);

    if (!existSauce)
        throw Error();
    if (!validLike)
        throw Error();

    let dislikeCounter = findedSauce.dislikes;
    let likeCounter = findedSauce.likes;
    let likes = findedSauce.usersLiked;
    let dislikes = findedSauce.usersDisliked;

    const hasLiked = findedSauce.usersLiked.includes(userId);
    const hasDisliked = findedSauce.usersDisliked.includes(userId);

    if (hasLiked && like === 1) // User has ready like and want like again
        throw Error();
    if (hasDisliked && like === -1) // User has ready dislike and want dislike again
        throw Error();
    
    const cdtToggleLike = (like === 0 && hasLiked); // User cancel like
    const cdtToggleDislike = (like === 0 && hasDisliked); // User cancel dislike
    const cdtDislikeToLike = (like === 1 && hasDisliked); // Dislike to Like
    const cdtLikeToDislike = (like === -1 && hasLiked); // Like to Dislike
    const cdtAddLike = (like === 1 && !hasDisliked && !hasLiked) // Add like
    const cdtAddDisLike = (like === -1 && !hasDisliked && !hasLiked) // Add dislike

    if (cdtToggleLike) {
       likeCounter = likeCounter - 1;
       likes = likes.filter(id => id !== userId);
    } else if (cdtToggleDislike) {
        dislikeCounter = dislikeCounter - 1;
        dislikes = dislikes.filter(id => id !== userId);
    } else if (cdtDislikeToLike) {
        dislikeCounter = dislikeCounter - 1;
        likeCounter = likeCounter + 1;
        likes.push(userId);
        dislikes = dislikes.filter(id => id !== userId);
    } else if (cdtLikeToDislike) {
        likeCounter = likeCounter - 1;
        dislikeCounter = dislikeCounter + 1;
        dislikes.push(userId);
        likes = likes.filter(id => id !== userId);
    } else if (cdtAddLike) {
        likeCounter = likeCounter + 1;
        likes.push(userId);
    } else if (cdtAddDisLike) {
        dislikeCounter = dislikeCounter + 1;
        dislikes.push(userId);
    } else{
        throw Error();
    }

    const modified = await model.findByIdAndUpdate(id,{
         dislikes:dislikeCounter,
         likes:likeCounter,
         usersDisliked:dislikes,
         usersLiked:likes
    }, {

    });

    return modified;
}

module.exports = {
    canAccess,
    likeSauce
};
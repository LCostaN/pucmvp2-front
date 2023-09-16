export default class GameLike {
  constructor(id, like, neutral, dislike) {
    this.id = id
    this.like = like || 0
    this.neutral = neutral || 0
    this.dislike = dislike || 0
  }

  static fromJson({id, like, neutral, dislike}) {
    return new GameLike(id, like, neutral, dislike)
  }
}
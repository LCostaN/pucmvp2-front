export default class Game {
  constructor(
    id,
    title,
    thumbnail,
    short_description,
    game_url,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    freetogame_profile_url
  ) {
    this.id = id
    this.title = title
    this.thumbnail = thumbnail
    this.short_description = short_description
    this.game_url = game_url
    this.genre = genre
    this.platform = platform
    this.publisher = publisher
    this.developer = developer
    this.release_date = release_date
    this.freetogame_profile_url = freetogame_profile_url
  }

  static fromJson({
    id,
    title,
    thumbnail,
    short_description,
    game_url,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    freetogame_profile_url
  }) {
    return new Game(
      id,
      title,
      thumbnail,
      short_description,
      game_url,
      genre,
      platform,
      publisher,
      developer,
      release_date,
      freetogame_profile_url
    )
  }
}

const { Pool } = require('pg')

class OpenMusicServices {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylist (playlistId) {
    const query = {
      text: `SELECT music.id, music.title, music.performer 
             FROM playlistsongs
             INNER JOIN music ON music.id = playlistsongs.song_id
             WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = OpenMusicServices

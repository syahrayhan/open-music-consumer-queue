const { Pool } = require('pg')

class OpenMusicServices {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylist (userId) {
    const query = {
      text: `SELECT playlistsongs.song_id, music.title, music.performer
      FROM playlistsongs
      LEFT JOIN music ON playlistsongs.song_id = music.id
      LEFT JOIN playlists ON playlistsongs.playlist_id = playlists.id
      WHERE playlists.owner = $1`,
      values: [userId]
    }

    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = OpenMusicServices

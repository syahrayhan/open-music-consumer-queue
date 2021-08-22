const { Pool } = require('pg')

class OpenMusicServices {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylist (owner) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username 
      FROM playlists 
      LEFT JOIN users ON users.id = playlists.owner
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id 
      WHERE playlists.owner = $1 OR collaborations.user_id = $1
      GROUP BY 1,2,3`,
      values: [owner]
    }

    const result = await this._pool.query(query)
    return result.rows
  }
}

module.exports = OpenMusicServices

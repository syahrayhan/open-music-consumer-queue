class Listener {
  constructor (openMusicServices, mailSender) {
    this._openMusicServices = openMusicServices
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen (message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString())
      console.log(playlistId, targetEmail)
      const playlist = await this._openMusicServices.getPlaylist(playlistId)
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist))
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Listener

class Listener {
  constructor (openMusicServices, mailSender) {
    this._openMusicServices = openMusicServices
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen (message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString())
      console.log(userId, targetEmail)
      const playlist = await this._openMusicServices.getPlaylist(userId)
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlist))
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Listener

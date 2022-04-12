class BlackList {
  constructor() {
    this.recentUsers = {
    }
  }

  addIp = (ip) => {
    this.recentUsers[ip] = new Date().getTime()
  }
  removeIp = (ip) => {
    delete this.recentUsers[ip]
  }
}

module.exports = BlackList

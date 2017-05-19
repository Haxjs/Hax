const serverController = {

  evaluateCode(req, res) {
    console.log('in code')
    res.send('working')

  }
};

module.exports = serverController;

import controller from '../controllers/extractController.js'

const extractRouter = (router) => {
  router.get('/extract/:year/:month', async (req, res) => {
    const {year, month} = req.params;
    try {
      const monthExtract = await controller.getMonthExtract(year, month);
      res.status(200).send({
        status_code: 200,
        data: monthExtract,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      })
    }
  })
}

export default { extractRouter };

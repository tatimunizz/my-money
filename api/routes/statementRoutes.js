import controller from '../controllers/statementController.js'

const statementRouter = (router) => {
  router.get('/statement/:year/:month', async (req, res) => {
    const {year, month} = req.params;
    const { user } = req.query;

    if (!user) {
      return res.status(400).send({
        status_code: 400,
        error: 'Parâmetro "user" é obrigatório na query string. Exemplo: /statement/2026/4?user=tati.muniz0',
      });
    }

    try {
      const monthStatement = await controller.getMonthStatement(year, month, user);
      res.status(200).send({
        status_code: 200,
        data: monthStatement,
      });
    } catch (e) {
      res.status(400).send({
        status_code: 400,
        error: e.message,
      })
    }
  })
}

export default { statementRouter };

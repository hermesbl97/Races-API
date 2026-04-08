//exportamos la función que recibe los parámetros de app y db de la base de datos
module.exports = (app,db) => {

    app.get('/carreras', async (req, res) => {
        const carreras = await db('carreras').select('*');
        res.json(carreras);
    });

    app.get('/carreras/:carrerasId', async (req, res) => {
        const carreras = await db('carreras').select('*').where({Id: req.params.carrerasId}).first();
        res.status(200).json(carreras);
    });

    app.post('/carreras', async (req, res) => {
        await db('carreras').insert({
            name: req.body.name,
            distance: req.body.distance,
            location: req.body.location,
            date: req.body.date,
        });
        res.status(201).json({});
    });

    app.put('/carreras/:carrerasId', async (req, res) => {
        await db('carreras').update({
            name: req.body.name,
            distance: req.body.distance,
            location: req.body.location,
            date: req.body.date,
        }).where({Id: req.params.carrerasId});
        res.status(201).json({});
    });

    app.delete('/carreras/:carrerasId', async (req, res) => {
        await db('carreras').del().where({Id: req.params.carrerasId});
        res.status(204).json({});
    });
}
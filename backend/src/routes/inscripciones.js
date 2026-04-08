module.exports = (app, db) => {
    app.get('/inscripciones', async (req, res) => {
        const inscripciones = await db('inscripciones').select('*');
        res.json(inscripciones);
    });

    app.get('/inscripciones/:inscripcionesId', async (req, res) => {
        const inscripciones = await db('inscripciones').select('*').where({Id: req.params.inscripcionesId}).first();
        res.status(200).json(inscripciones);
    });

    app.post('/inscripciones', async (req, res) => {
        await db('inscripciones').insert({
            date: new Date().toLocaleDateString(),
            state: "Aceptada",
            price: req.body.price,
            atleta_id: req.body.atletaId,
            carrera_id: req.body.carreraId
        });
        res.status(201).json({});
    });

    app.put('/inscripciones/:inscripcionesId', async (req, res) => {
        await db('inscripciones').update({
            date: req.body.date,
            price: req.body.price,
            state: req.body.state,
            atleta_id: req.body.atletaId,
            carrera_id: req.body.carreraId
        }).where({Id: req.params.inscripcionesId});
        res.status(201).json({});
    });

    app.delete('/inscripciones/:inscripcionesId', async (req, res) => {
        await db('inscripciones').del().where({Id: req.params.inscripcionesId});
        res.status(204).json({});
    });
}
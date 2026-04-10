module.exports = (app, db) => {
    app.get('/inscripciones', async (req, res) => {
        const inscripciones = await db('inscripciones')
            // Unimos las tablas para poder extraer los datos de las tablas externas carreras y atletas
            .leftJoin('atletas', 'inscripciones.atleta_id', 'atletas.id') 
            .leftJoin('carreras', 'inscripciones.carrera_id', 'carreras.id')
            .select({
                id: 'inscripciones.id',
                state: 'inscripciones.state',
                price: 'inscripciones.price',
                date: 'inscripciones.date',
                atleta_name: 'atletas.name',
                atleta_surname: 'atletas.surname',
                carrera_name: 'carreras.name'
            });
        res.json(inscripciones);
    });

    app.get('/inscripciones/:inscripcionesId', async (req, res) => {
        const inscripciones = await db('inscripciones').select('*').where({ Id: req.params.inscripcionesId }).first();
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
        }).where({ Id: req.params.inscripcionesId });
        res.status(201).json({});
    });

    app.delete('/inscripciones/:inscripcionesId', async (req, res) => {
        await db('inscripciones').del().where({ Id: req.params.inscripcionesId });
        res.status(204).json({});
    });
}
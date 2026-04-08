//exportamos la función que recibe los parámetros de app y db de la base de datos
module.exports = (app,db) => {

    app.get('/atletas', async (req, res) => {
        const atletas = await db('atletas').select('*');
        res.json(atletas);
    });

    app.get('/atletas/:atletasId', async (req, res) => {
        const atletas = await db('atletas').select('*').where({Id: req.params.atletasId}).first();
        res.status(200).json(atletas);
    });

    app.post('/atletas', async (req, res) => {
        await db('atletas').insert({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            dni: req.body.dni,
            telephone: req.body.telephone,
            photo: req.body.photo
        });
        res.status(201).json({});
    });

    app.put('/atletas/:atletasId', async (req, res) => {
        await db('atletas').update({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            dni: req.body.dni,
            telephone: req.body.telephone,
            photo: req.body.photo
        }).where({Id: req.params.atletasId});
        res.status(201).json({});
    });

    app.delete('/atletas/:atletasId', async (req, res) => {
        await db('atletas').del().where({Id: req.params.atletasId});
        res.status(204).json({});
    });
}
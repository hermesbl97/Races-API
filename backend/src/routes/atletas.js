//exportamos la función que recibe los parámetros de app y db de la base de datos
module.exports = (app, db) => {

    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../images'),
        filename: (req, file, cb) => {
            cb(null, 'foto-' + Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage: storage });

    app.get('/atletas', async (req, res) => {
        const atletas = await db('atletas').select('*');
        res.json(atletas);
    });

    app.get('/atletas/:atletasId', async (req, res) => {
        const atletas = await db('atletas').select('*').where({ Id: req.params.atletasId }).first();
        res.status(200).json(atletas);
    });

    app.post('/atletas', upload.single('photo'), async (req, res) => {
        try {
            // Si no se sube imagen usamos la imagen por defecto
            const photoName = req.file ? req.file.filename : 'default-image.jpg';

            await db('atletas').insert({
                name: req.body.name,
                surname: req.body.surname,
                age: req.body.age,
                dni: req.body.dni,
                telephone: req.body.telephone,
                city: req.body.city,
                photo: photoName
            });

            res.status(201).json({ message: "Atleta registrado" });
        } catch (error) {
            res.status(500).json({ error: "Error al insertar" });
        }
    });

    app.put('/atletas/:atletasId', async (req, res) => {
        await db('atletas').update({
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            dni: req.body.dni,
            telephone: req.body.telephone,
            city: req.body.city,
        }).where({ Id: req.params.atletasId });
        res.status(201).json({});
    });

    app.delete('/atletas/:atletasId', async (req, res) => {
        await db('atletas').del().where({ Id: req.params.atletasId });
        res.status(204).json({});
    });
}
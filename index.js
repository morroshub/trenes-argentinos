var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : ''
});

connection.connect();

var app = express();
app.use(express.json());
app.use('/', express.static('public'));

app.post('/data', function (req, res) {
    var fecha = req.body.fecha.substring(0, req.body.fecha);

	
    var sql = "SELECT " +
    "DIA_TRANSPORTE, " +
    "DIA_SEMANA, " +
    "NOMBRE_EMPRESA, " +
    "LINEA, " +
    "AMBA, " +
    "TIPO_TRANSPORTE, " +
    "JURISDICCION, " +
    "PROVINCIA, " +
    "MUNICIPIO, " +
    "CANTIDAD " +
    "FROM youtube.renfe " +
    "GROUP BY DIA_TRANSPORTE, DIA_SEMANA, NOMBRE_EMPRESA, LINEA, AMBA, TIPO_TRANSPORTE, JURISDICCION, PROVINCIA, MUNICIPIO, CANTIDAD " +
    "HAVING CANTIDAD > 1000 " +
    "ORDER BY CANTIDAD DESC";


    connection.query(sql, function (err, rows, fields) {
        var datos = {
            labels: [],
            datasets: [
                {
                    label: 'Media',
                    data: [],
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860'
                }
            ]
        };

        for (var i = 0; i < rows.length; i++) {
            datos.labels.push(rows[i].DIA_TRANSPORTE);
            datos.datasets[0].data.push(rows[i].CANTIDAD);
        }

        res.send(datos);
    });
});


app.listen(3006, function () {
    console.log('Example app listening on port 3000!');
  });
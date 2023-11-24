
const path = require('path')
const ffmpeg = require('fluent-ffmpeg');

const inputVideo = path.join(__dirname, '../assets/video_cr7.mp4');
const outputDirectory = path.join(__dirname, '../output');

ffmpeg(inputVideo)
    .outputOptions([
        '-c:v h264',
        '-hls_time 10', // Define a duração de cada segmento HLS em segundos
        '-hls_list_size 0', // Mantém uma lista infinita de segmentos na playlist
    ])
    .output(`${outputDirectory}/output.m3u8`)
    .on('end', () => {
        console.log('Conversão concluída. HLS pronto para ser servido.');
    })
    .on('error', (err) => {
        console.error('Erro durante a conversão:', err);
    })
    .run();
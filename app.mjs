async function predictExample(inputTensor) {
    // Cargar el modelo
    const model = await tf.loadLayersModel('model.json')

    // Datos de entrada para la predicción (normalizados según el preprocesamiento durante el entrenamiento)
    // const inputTensor = tf.tensor2d([dataUser])

    // Predecir
    const prediction = model.predict(inputTensor)
    // Obtener el resultado
    const probability = prediction.dataSync()
    // Haz algo con el resultado
    console.log('Prediction Result:', probability)
    const result =
        probability > 0.5
            ? 'Suscribira un deposito a plazo'
            : 'No suscribira un deposito a plazo'

    const resultBox = document.getElementById('result')
    resultBox.innerHTML = result
    // Puedes liberar los recursos después de usar el modelo
    inputTensor.dispose()
    prediction.dispose()
}

// Llamar a la función asíncrona
// predictExample()

function predictData(e) {
    e.preventDefault()
    // <!-- age	job	marital	education	balance	housing	loan	contact	day	month	duration	campaign	pdays	 -->
    const edad = document.getElementById('age').value
    const job = document.getElementById('job').value
    const marital = document.getElementById('marital').value
    const education = document.getElementById('education').value
    const balance = document.getElementById('balance').value
    const housing = document.getElementById('housing').value
    const loan = document.getElementById('loan').value
    const contact = document.getElementById('contact').value
    const day = document.getElementById('day').value
    const month = document.getElementById('month').value
    const duration = document.getElementById('duration').value
    const campaign = document.getElementById('campaign').value
    const pdays = document.getElementById('pdays').value
    console.log(
        edad,
        job,
        marital,
        education,
        balance,
        housing,
        loan,
        contact,
        day,
        month,
        duration,
        campaign,
        pdays
    )
    const inputTensor = tf.tensor2d([
        [
            Number(edad),
            Number(job),
            Number(marital),
            Number(education),
            Number(balance),
            Number(housing),
            Number(loan),
            Number(contact),
            Number(day),
            Number(month),
            Number(duration),
            Number(campaign),
            Number(pdays),
        ],
    ])

    // Predecir
    predictExample(inputTensor)
}

const formPredict = document.getElementById('form-pred')
formPredict.addEventListener('submit', predictData)

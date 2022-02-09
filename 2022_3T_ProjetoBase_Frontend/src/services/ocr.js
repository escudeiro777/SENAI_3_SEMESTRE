import axios from "axios";

export const lerConteudoDaImagem = async (formData) => {

    let resultado;

    await axios({

        method: "POST",
        url: "https://ocr-equipamentos-escudeiro.cognitiveservices.azure.com/vision/v3.2/ocr?language=unk&detectOrientation=true&model-version=latest",
        data: formData,
        headers: {
            "ContentType": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": "363f54d8abd24a0a94f3b4e521965f6c"

        }
    })
        .then(response => {
            console.log(response)
            resultado = FiltrarOBJ(response.data)   
        })
        .catch(erro => console.log(erro))
    

    return resultado;
}

export const FiltrarOBJ = (obj) => {
    let resultado;
    obj.regions.forEach(region => {
        region.lines.forEach(line => {
            line.words.forEach(word => {
                if (word.text[0] === "1" && word.text[1] === "2") {
                    resultado = word.text;
                }
            });

        });
    });
    return resultado;
}

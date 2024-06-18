const produtosCadastrados = {
    categoriaA :[
        { id: '0001', nome: 'Produto 01', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0002', nome: 'Produto 02', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0003', nome: 'Produto 03', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0004', nome: 'Produto 04', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0005', nome: 'Produto 05', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0006', nome: 'Produto 06', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0007', nome: 'Produto 07', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0008', nome: 'Produto 08', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0009', nome: 'Produto 09', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0010', nome: 'Produto 10', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0011', nome: 'Produto 11', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0012', nome: 'Produto 12', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0013', nome: 'Produto 13', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto13.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0014', nome: 'Produto 14', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto14.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0015', nome: 'Produto 15', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto15.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0016', nome: 'Produto 16', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto16.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0017', nome: 'Produto 17', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto17.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0018', nome: 'Produto 18', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto18.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0019', nome: 'Produto 19', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto19.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0020', nome: 'Produto 20', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto20.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0021', nome: 'Produto 21', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto21.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0022', nome: 'Produto 22', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto22.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0023', nome: 'Produto 23', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto23.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0024', nome: 'Produto 24', categoria:'A', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto24.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
    ],

    categoriaB :[
        { id: '0025', nome: 'Produto 25', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0026', nome: 'Produto 26', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0027', nome: 'Produto 27', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0028', nome: 'Produto 28', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0029', nome: 'Produto 29', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0030', nome: 'Produto 30', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0031', nome: 'Produto 31', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0032', nome: 'Produto 32', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0033', nome: 'Produto 33', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0034', nome: 'Produto 34', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0035', nome: 'Produto 35', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0036', nome: 'Produto 36', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0037', nome: 'Produto 37', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0038', nome: 'Produto 38', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0039', nome: 'Produto 39', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0040', nome: 'Produto 40', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0041', nome: 'Produto 41', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0042', nome: 'Produto 42', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0043', nome: 'Produto 43', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 50 },
        { id: '0044', nome: 'Produto 44', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0045', nome: 'Produto 45', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0046', nome: 'Produto 46', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0047', nome: 'Produto 47', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0048', nome: 'Produto 48', categoria:'B', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
    ],

    categoriaC :[
        { id: '0051', nome: 'Produto 51', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0052', nome: 'Produto 52', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0053', nome: 'Produto 53', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0054', nome: 'Produto 54', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0055', nome: 'Produto 55', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0056', nome: 'Produto 56', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0057', nome: 'Produto 57', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 50 },
        { id: '0058', nome: 'Produto 58', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0059', nome: 'Produto 59', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0060', nome: 'Produto 60', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0061', nome: 'Produto 61', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0062', nome: 'Produto 62', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0063', nome: 'Produto 63', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0064', nome: 'Produto 64', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0065', nome: 'Produto 65', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0066', nome: 'Produto 66', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0067', nome: 'Produto 67', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0068', nome: 'Produto 68', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0069', nome: 'Produto 69', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0070', nome: 'Produto 70', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0071', nome: 'Produto 71', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0072', nome: 'Produto 72', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0073', nome: 'Produto 73', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0074', nome: 'Produto 74', categoria:'C', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
    ],

    categoriaD :[
        { id: '0075', nome: 'Produto 75', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0076', nome: 'Produto 76', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0077', nome: 'Produto 77', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0078', nome: 'Produto 78', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0079', nome: 'Produto 79', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0080', nome: 'Produto 80', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0081', nome: 'Produto 81', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0082', nome: 'Produto 82', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0083', nome: 'Produto 83', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0084', nome: 'Produto 84', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0085', nome: 'Produto 85', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0086', nome: 'Produto 86', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0087', nome: 'Produto 87', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '9,90', precoFloat: 9.9, imagem: '../assets/images/produto01.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0088', nome: 'Produto 88', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '19,90', precoFloat: 19.9, imagem: '../assets/images/produto02.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0089', nome: 'Produto 89', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '29,90', precoFloat: 29.9, imagem: '../assets/images/produto03.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 50 },
        { id: '0090', nome: 'Produto 90', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '39,90', precoFloat: 39.9, imagem: '../assets/images/produto04.jpg', imagemAlt: "Descrição da imagem", oferta: true, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0091', nome: 'Produto 91', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '49,90', precoFloat: 49.9, imagem: '../assets/images/produto05.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0092', nome: 'Produto 92', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '59,90', precoFloat: 59.9, imagem: '../assets/images/produto06.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0093', nome: 'Produto 93', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '69,90', precoFloat: 69.9, imagem: '../assets/images/produto07.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0094', nome: 'Produto 94', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '79,90', precoFloat: 79.9, imagem: '../assets/images/produto08.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: true, estoque: 500 },
        { id: '0095', nome: 'Produto 95', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '89,90', precoFloat: 89.9, imagem: '../assets/images/produto09.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0096', nome: 'Produto 96', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '99,90', precoFloat: 99.9, imagem: '../assets/images/produto10.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0097', nome: 'Produto 97', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '109,90', precoFloat: 109.9, imagem: '../assets/images/produto11.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
        { id: '0098', nome: 'Produto 98', categoria:'D', descricao: "Esta é a descrição do produto. Aqui estão descritos as principais caracterísitcas dele.", precoString: '119,90', precoFloat: 119.9, imagem: '../assets/images/produto12.jpg', imagemAlt: "Descrição da imagem", oferta: false, precoComOferta:"", novidade: false, estoque: 500 },
    ],
};

export { produtosCadastrados }
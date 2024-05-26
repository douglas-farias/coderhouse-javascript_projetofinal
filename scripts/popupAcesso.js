const popupAcesso = document.querySelector(".container__acesso");

function abrirPopupAcesso() {
    popupAcesso.classList.add("container__acesso--exibir");
};

function fecharPopupAcesso() {
    popupAcesso.classList.remove("container__acesso--exibir");
};

export { abrirPopupAcesso, fecharPopupAcesso };
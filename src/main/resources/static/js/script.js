document.addEventListener('DOMContentLoaded', function() {

    // Dados simulados dos eventos (Você pode adicionar mais aqui)
    const eventos = [
        {
            titulo: "Conferência Acadêmica UEPA",
            descricao: "Grande conferência reunindo palestrantes renomados, professores e alunos para discutir temas relevantes da atualidade acadêmica.",
            data: "09 de dezembro de 2025",
            horario: "08:00 - 18:00",
            img: "https://lh6.googleusercontent.com/proxy/42YycmNM5ZFaMGhMBBziDVx4V_vsDKyTccr1D39Uk8vDrvAqWgYio832_TozJpKzrW8Jz9Zug-D5hVQi5n7lnDnvKA73apea_0VUWjQSRTGq3Ryo6ODsDfz-PewP4J6S3L3INp-PcVP6yWdQc4R9m3ETLqqovaR8KNZM05E8hVNVcmZBk3-0GL98", // Imagem placeholder
            status: "Em breve"
        },
        {
            titulo: "Inauguração do Novo Campus",
            descricao: "Cerimônia de inauguração das novas instalações do campus da UEPA. Evento especial com a presença de autoridades e comunidade.",
            data: "14 de dezembro de 2025",
            horario: "09:00 - 17:00",
            img: "https://noticiasconcursos.com.br/wp-content/uploads/2023/10/noticiasconcursos.com.br-uepa-recebe-inscricoes-para-processo-seletivo-2024-20230602-070313-1024x768-1.png", // Imagem placeholder
            status: "Em breve"
        },
        {
            titulo: "Simpósio de Pesquisa Científica",
            descricao: "Apresentação dos trabalhos de pesquisa desenvolvidos por alunos e professores da UEPA. Venha prestigiar a ciência.",
            data: "19 de dezembro de 2025",
            horario: "14:00 - 19:00",
            img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop", // Imagem placeholder
            status: "Em breve"
        }
    ];

    const container = document.getElementById('events-container');

    // Função para gerar o HTML de cada card
    eventos.forEach(evento => {
        const cardHTML = `
            <div class="col-md-4">
                <div class="event-card">
                    <div class="card-image-wrapper">
                        <img src="${evento.img}" alt="${evento.titulo}">
                        <span class="badge-custom">${evento.status}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="event-title">${evento.titulo}</h5>
                        <p class="event-desc">${evento.descricao}</p>

                        <div class="mt-auto">
                            <div class="event-meta">
                                <i class="bi bi-calendar4"></i>
                                <span>${evento.data}</span>
                            </div>
                            <div class="event-meta">
                                <i class="bi bi-clock"></i>
                                <span>${evento.horario}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Adiciona o card ao container
        container.innerHTML += cardHTML;
    });
});
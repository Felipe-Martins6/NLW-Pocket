const{ select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value:"Tomar 3L de água por dia",
    checked: false

}

let  metas = [ meta]

    
const cadastrarMeta = async () => {

    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia")
        return
    }
    metas.push({value: meta, checked: false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message:"Use as setas para mudar de metas, o espaço para marcar e desmarcar e o enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) =>{
        m.checked = false
    })

    respostas.forEach((resposta) =>{
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Metas(s) marcadas como concluida(s)")
}

const start =  async () => {

    //menu da aplicação usando whille
    while(true){


       // a palavra await é para aguardar a pessoa selecionar a opção e quando você utuiliza ela você precisa colocar na função o async
        const opcao = await select({
            message: "menu >",
            choices: [{

                name: "Cadastrar meta",
                value: "Cadastrar"
            },
            {
                name:"Listar metas",
                value: "Listar"
            },
        {
            name: "Sair",
            value: "Sair"
        }
        ]
        })

        switch(opcao){
            case "Cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "Listar":
                await listarMetas()
                console.log("Vamos listar")
                break
            case "Sair":
                console.log("Até a proxima!")
                return
                }
    }
}

start()
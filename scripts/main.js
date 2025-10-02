document.addEventListener('DOMContentLoaded', function() {
    const projectsCards = document.getElementById('projects-cards')
    const projects = [
        {
            file: 'Inventory.html',
            title: 'Inventory System',
            desc: 'Modular Inventory system for handling items',
            img: 'assets/images/Inventory.png',
            tech: ['Luau']
        },
        {
            file: 'Quest.html',
            title: 'Quest System',
            desc: 'Dynamic quest system for players to complete',
            img: 'assets/images/QuestSystem.png',
            tech: ['Luau']
        },
        {
            file: 'CaveGeneration.html',
            title: 'Cave Generation',
            desc: 'Procedural cave generation.',
            img: 'assets/images/Cave.png',
            tech: ['Luau']
        },
        {
            file: 'InteractionHandler.html',
            title: 'Interaction Handler',
            desc: 'Handles player interactions.',
            img: 'assets/images/Interaction.png',
            tech: ['Luau']
        },
        {
            file: 'Scp079.html',
            title: 'SCP-079',
            desc: 'SCP-079 is a sentient AI that hacks devices within the facility.',
            img: 'assets/images/scp079.png',
            tech: ['Glua']
        },
        {
            file: 'NeuroController.html',
            title: 'NeuroController',
            desc: 'NeuroController for SCP RP.',
            img: 'assets/images/Neurocontroller.png',
            tech: ['Glua']
        },
        {
            file: 'CurrencyHandler.html',
            title: 'CurrencyHandler',
            desc: 'CurrencyHandler for managing in-game currency.',
            img: '',
            tech: ['Luau']
        },
        {
            file: 'UserGroups.html',
            title: 'UserGroups',
            desc: 'UserGroups management for players.',
            img: '',
            tech: ['Luau']
        }
    ]
    projects.forEach(function(project) {
        const card = document.createElement('div')
        card.className = 'card'

        const imageContainer = document.createElement('div')
        imageContainer.className = 'card-image-container'

        if (project.img) {
            const image = document.createElement('img')
            image.src = project.img
            image.alt = project.title + ' Image'
            imageContainer.appendChild(image)
        }

        const gradient = document.createElement('div')
        gradient.className = 'card-image-gradient'
        imageContainer.appendChild(gradient)
        card.appendChild(imageContainer)

        const cardContent = document.createElement('div')
        cardContent.className = 'card-content'

        const cardTitle = document.createElement('div')
        cardTitle.className = 'card-title'
        cardTitle.textContent = project.title
        cardContent.appendChild(cardTitle)

        const cardDesc = document.createElement('div')
        cardDesc.className = 'card-desc'
        cardDesc.textContent = project.desc
        cardContent.appendChild(cardDesc)

        if (project.tech && project.tech.length > 0) {
            const cardTech = document.createElement('div')
            cardTech.className = 'card-tech'
            const ul = document.createElement('ul')
            project.tech.forEach(function(t) {
                const li = document.createElement('li')
                li.textContent = t
                ul.appendChild(li)
            })
            cardTech.appendChild(ul)
            cardContent.appendChild(cardTech)
        }

        const actions = document.createElement('div')
        actions.className = 'card-actions'
        const btn = document.createElement('button')
        btn.className = 'button'
        btn.textContent = 'View'
        btn.onclick = function() {
            location.href = 'projects/' + project.file
        }
        actions.appendChild(btn)
        cardContent.appendChild(actions)

        card.appendChild(cardContent)
        projectsCards.appendChild(card)
    })

    const experienceCards = document.getElementById('experience-cards')
    const experiences = [
        {
            company: 'Delve',
            role: 'Scripter',
            desc: 'Developed a large amount of systems and gameplay mechanics.',
            img: 'assets/images/Delve_Discord_PFP.png',
            file: 'Delve.html',
            tech: ['Luau']
        },
        {
            company: 'Civil Networks',
            role: 'Core Developer',
            desc: 'Worked on various projects for Civil Networks. Mainly focused on their SCP RP site 65 and site 9 servers.',
            img: 'assets/images/Civilnetworks.jpg',
            file: 'CivilNetworks.html',
            tech: ['Glua']
        }
    ]
    experiences.forEach(function(exp) {
        const card = document.createElement('div')
        card.className = 'card'

        const imageContainer = document.createElement('div')
        imageContainer.className = 'card-image-container'

        if (exp.img) {
            const image = document.createElement('img')
            image.src = exp.img
            image.alt = exp.company + ' Logo'
            imageContainer.appendChild(image)
        }

        const gradient = document.createElement('div')
        gradient.className = 'card-image-gradient'
        imageContainer.appendChild(gradient)
        card.appendChild(imageContainer)

        const cardContent = document.createElement('div')
        cardContent.className = 'card-content'

        const cardTitle = document.createElement('div')
        cardTitle.className = 'card-title'
        cardTitle.textContent = exp.company + (exp.role ? ' - ' + exp.role : '')
        cardContent.appendChild(cardTitle)

        const cardDesc = document.createElement('div')
        cardDesc.className = 'card-desc'
        cardDesc.textContent = exp.desc
        cardContent.appendChild(cardDesc)

        if (exp.tech && exp.tech.length > 0) {
            const cardTech = document.createElement('div')
            cardTech.className = 'card-tech'
            const ul = document.createElement('ul')
            exp.tech.forEach(function(t) {
                const li = document.createElement('li')
                li.textContent = t
                ul.appendChild(li)
            })
            cardTech.appendChild(ul)
            cardContent.appendChild(cardTech)
        }

        if (exp.file) {
            const actions = document.createElement('div')
            actions.className = 'card-actions'
            const btn = document.createElement('button')
            btn.className = 'button'
            btn.textContent = 'View'
            btn.onclick = function() {
                location.href = 'experience/' + exp.file
            }
            actions.appendChild(btn)
            cardContent.appendChild(actions)
        }

        card.appendChild(cardContent)
        experienceCards.appendChild(card)
    })
})
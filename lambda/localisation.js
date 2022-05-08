/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. handlerInput.t('WELCOME_MSG')
 * Later we'll move these string to a separate file to avoid polluting index.js 
 * */
module.export = {
    en: {
        translation: {
            WELCOME_MSG: `Welcome to Happy Birthday. Let's have some fun with your birthday! `,
            REGISTER_MSG: 'Your birthday is {{month}} {{day}} {{year}}.',
            REJECTED_MSG: 'No problem. Please say the date again so I can get it right.',
            HELP_MSG: `You can tell me your date of birth and I'll take note. You can also just say, register my birthday and I will guide you. Which one would you like to try?`,
            GOODBYE_MSG: 'Goodbye!',
            REFLECTOR_MSG: 'You just triggered {{intent}}',
            FALLBACK_MSG: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MSG: 'Sorry, there was an error. Please try again.'
        }
    },
    it: {
        translation: {
            WELCOME_MSG: `Benvenuto a Buon Compleanno. Esploreremo un paio di funzionalità usando la tua data di nascita! `,
            REGISTER_MSG: 'Il tuo compleanno è il {{day}} di {{month}}, {{year}}.',
            REJECTED_MSG: 'Nessun problema. Per favore ridimmi la data e sistemiamo subito.',
            HELP_MSG: `Dimmi la tua data di nascita e me la segnerò. Altrimenti puoi chiedermi di ricordarti il tuo compleanno e ti guido io passo per passo. Come preferisci procedere?`,
            GOODBYE_MSG: 'A presto!',
            REFLECTOR_MSG: 'Hai invocato l\'intento {{intent}}',
            FALLBACK_MSG: 'Perdonami, penso di non aver capito bene. Riprova.',
            ERROR_MSG: 'Scusa, c\'è stato un errore. Riprova.'
        }
    },    
    es: {
        translation: {
            WELCOME_MSG: 'Te doy la bienvenida a Feliz Cumpleaños. Vamos a divertirnos un poco con tu cumpleaños! ',
            REGISTER_MSG: 'Tu fecha de cumpleaños es el {{day}} de {{month}} de {{year}}.',
            REJECTED_MSG: 'No pasa nada. Por favor dime la fecha otra vez y lo corregimos.',
            HELP_MSG: 'Puedes decirme el día, mes y año de tu nacimiento y tomaré nota de ello. También puedes decirme, registra mi cumpleaños y te guiaré. Qué quieres hacer?',
            GOODBYE_MSG: 'Hasta luego!',
            REFLECTOR_MSG: 'Acabas de activar {{intent}}',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
            ERROR_MSG: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.'
        }
    },
    fr:{
        translation: {
            WELCOME_MSG: 'Bienvenue sur la Skill des anniversaires! ',
            REGISTER_MSG: 'Votre date de naissance est le {{day}} {{month}} {{year}}.',
            REJECTED_MSG: 'D\'accord, je ne vais pas prendre en compte cette date. Dites-moi une autre date pour que je puisse l\'enregistrer.',
            HELP_MSG: 'Je peux me souvenir de votre date de naissance. Dites-moi votre jour, mois et année de naissance ou bien dites-moi simplement \'"enregistre mon anniversaire"\' et je vous guiderai. Quel est votre choix ?',
            GOODBYE_MSG: 'Au revoir!',
            REFLECTOR_MSG: 'Vous avez invoqué l\'intention {{intent}}',
            FALLBACK_MSG: 'Désolé, je ne sais pas répondre à votre demande. Pouvez-vous reformuler?.',
            ERROR_MSG: 'Désolé, je n\'ai pas compris. Pouvez-vous reformuler?'
        }
    },
    "fr-CA": {
        translation: {
            WELCOME_MSG: 'Bienvenue sur la Skill des fêtes! ',
            HELP_MSG: 'Je peux me souvenir de votre date de naissance. Dites-moi votre jour, mois et année de naissance ou bien dites-moi simplement \'sauve ma fête\' et je vous guiderai. Quel est votre choix ?',
        }
    }
}
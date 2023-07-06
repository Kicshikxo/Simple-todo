import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
    theme: { defaultTheme: 'dark' },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    }
})

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseUrl = 'https://larzxxvzvvrgvptbkwtm.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    detectSessionInUrl: false,
  },
});

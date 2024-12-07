'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function addInfo(formData: FormData) {
  try {
    // Parse skills from comma-separated string to array and then to JSON
    const skillsString = formData.get('skills') as string
    const skills = skillsString.split(',').map(skill => skill.trim())

    const { data, error } = await supabase
      .from('info')
      .insert([
        {
          role: formData.get('role'),
          year: formData.get('year'),
          skills: skills,
          university: formData.get('university'),
          work_rights: formData.get('work_rights'),
        }
      ])
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    return { success: false, error: 'Failed to add info' }
  }
}


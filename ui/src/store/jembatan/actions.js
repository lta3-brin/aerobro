import axios from 'axios'

export async function versionAction () {
  const repo = process.env.REPO_NAME
  const result = await axios.get(`https://api.github.com/repos/bbta3-bppt/${repo}/tags`)

  return result.data
}

import { Theme } from '@material-ui/core'

export default function basicStyles (theme: Theme) {
  return {
    mt1: { marginTop: theme.spacing(1) },
    mt2: { marginTop: theme.spacing(2) },
    mr1: { marginRight: theme.spacing(1) },
    mr2: { marginRight: theme.spacing(2) },
    mb1: { marginBottom: theme.spacing(1) },
    mb2: { marginBottom: theme.spacing(2) },
    ml1: { marginLeft: theme.spacing(1) },
    ml2: { marginLeft: theme.spacing(2) },
  }
}

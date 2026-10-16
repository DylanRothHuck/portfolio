export type Suit = 'copa' | 'espada' | 'oro' | 'basto'

export interface Ability {
  number: string
  suit: Suit
  figure: string
  title: string
  text: string
  /** Filename stem of the card art in `src/assets/reino/cards`. */
  art: string
}

export interface Mode {
  id: 'online' | 'bot' | 'local'
  label: string
  text: string
  status: string
}

export const abilities: Ability[] = [
  {
    number: '1',
    suit: 'copa',
    figure: 'Reactivar',
    title: 'Reactivar o Maldecir',
    text: 'Sin objetivo, vuelve a activar una de tus cartas que ya está en la pila de activadas. Con objetivo, le pasás tu maldición del 8 a otro jugador.',
    art: 'one-cup',
  },
  {
    number: '2',
    suit: 'espada',
    figure: 'Escudo',
    title: 'Levantá el Escudo',
    text: 'Protege una de tus cartas, o un prisionero, contra un robo o un intercambio. Es acumulable.',
    art: 'two-sword',
  },
  {
    number: '3',
    suit: 'oro',
    figure: 'Intercambio',
    title: 'Intercambio con el Rival',
    text: 'Cambiás una carta tuya por una de otro jugador: mano por mano o pila por pila.',
    art: 'three-gold',
  },
  {
    number: '7',
    suit: 'basto',
    figure: 'Robo',
    title: 'Róbale al Rival',
    text: 'Robás una carta de otro jugador, ya sea de su mano o de su pila de prisioneros.',
    art: 'seven-stick',
  },
  {
    number: '8',
    suit: 'copa',
    figure: 'Maldición',
    title: 'La Maldición',
    text: 'Se suma a la mano de otro jugador como carta extra: mientras la tenga no puede declarar Reino. Se la pasa con el 1, el 3 o el 7.',
    art: 'eight-gold',
  },
  {
    number: '9',
    suit: 'espada',
    figure: 'Robo de Pila',
    title: 'Robo de tu Pila',
    text: 'Traés una carta de tu propia pila de vuelta a la mano. No termina tu turno.',
    art: 'nine-sword',
  },
]

export const modes: Mode[] = [
  {
    id: 'online',
    label: 'Juega Online',
    text: 'Partidas en tiempo real contra jugadores de todo el reino.',
    status: 'Disponible',
  },
  {
    id: 'bot',
    label: 'Contra Bots',
    text: 'Practicá contra la IA en dificultad fácil o difícil.',
    status: 'Disponible',
  },
  {
    id: 'local',
    label: 'O en Local',
    text: 'De 2 a 4 jugadores pasando el dispositivo entre turnos.',
    status: 'Próximamente',
  },
]

export const suitColor: Record<Suit, string> = {
  copa: '#b23b3b',
  espada: '#3e6da8',
  oro: '#c9962e',
  basto: '#4c7a45',
}

export type Period = 'Anual' | 'Primer Cuatrimestre' | 'Segundo Cuatrimestre'

export interface Subject {
  code: string
  name: string
  year: number
  period: Period
  /** Numeric grade (6-10) when the subject is passed. */
  grade?: number
  /** e.g. 'Sobresaliente', 'Muy Bueno', 'Distinguido', 'Bueno', 'Aprobado'. */
  concept?: string
  /** e.g. 'Prom. Dir.' (promocion directa) or 'Ex. Final'. */
  modality?: string
  /** Set instead of a grade when there is no result yet. */
  status?: 'En curso' | 'Examen final' | 'Sin cursar'
}

export const degree = 'Ingeniero en Sistemas de Información (RM 4643/17)'

export const courseStatus = [
  { label: 'No cursadas', value: 1 },
  { label: 'Aprobadas', value: 58 },
  { label: 'Regularizadas', value: 2 },
  { label: 'Perdidas', value: 0 },
  { label: 'En curso', value: 5 },
  { label: 'Abandonadas', value: 0 },
  { label: 'Incompletas', value: 0 },
]

export const averages = [
  { label: 'Con aplazos', subjects: 67, average: 7.64 },
  { label: 'Sin aplazos', subjects: 58, average: 8.28 },
]

export const subjects: Subject[] = [
  // Primer año
  { code: '11068', name: 'Introducción a la programación', year: 1, period: 'Primer Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
  { code: '11069', name: 'Principios de administración y organización', year: 1, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11070', name: 'Introducción a la informática', year: 1, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11071', name: 'Inglés I', year: 1, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11072', name: 'Álgebra I', year: 1, period: 'Primer Cuatrimestre', grade: 6, concept: 'Aprobado', modality: 'Ex. Final' },
  { code: '11073', name: 'Cosmovisión bíblico cristiana', year: 1, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '12544', name: 'Introducción a la vida universitaria', year: 1, period: 'Primer Cuatrimestre', status: 'Sin cursar' },
  { code: '11074', name: 'Programación I', year: 1, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Ex. Final' },
  { code: '11075', name: 'Sistemas de información', year: 1, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11076', name: 'Matemática discreta', year: 1, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11077', name: 'Inglés II', year: 1, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11078', name: 'Álgebra II', year: 1, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11079', name: 'Sistemas de representación', year: 1, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11080', name: 'Antropología bíblico cristiana', year: 1, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },

  // Segundo año
  { code: '11081', name: 'Algoritmos y estructura de datos', year: 2, period: 'Primer Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
  { code: '11082', name: 'Ingeniería del software I', year: 2, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11083', name: 'Teoría de la computación', year: 2, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11084', name: 'Electricidad y electrónica', year: 2, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11085', name: 'Bases de datos', year: 2, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11086', name: 'Física I', year: 2, period: 'Primer Cuatrimestre', grade: 6, concept: 'Aprobado', modality: 'Ex. Final' },
  { code: '11087', name: 'Fundamentos del cristianismo', year: 2, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11088', name: 'Programación II', year: 2, period: 'Segundo Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
  { code: '11089', name: 'Ingeniería del software II', year: 2, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Ex. Final' },
  { code: '11090', name: 'Arquitectura y organización de computadoras', year: 2, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11091', name: 'Análisis matemático I', year: 2, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11092', name: 'Física II', year: 2, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Ex. Final' },
  { code: '11093', name: 'Principios de vida saludable', year: 2, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },

  // Tercer año
  { code: '11094', name: 'Informática aplicada', year: 3, period: 'Anual', grade: 8, concept: 'Muy Bueno', modality: 'Ex. Final' },
  { code: '11095', name: 'Programación III', year: 3, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11096', name: 'Sistemas operativos I', year: 3, period: 'Primer Cuatrimestre', grade: 6, concept: 'Aprobado', modality: 'Ex. Final' },
  { code: '11097', name: 'Análisis matemático II', year: 3, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11098', name: 'Química', year: 3, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11099', name: 'Física III', year: 3, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11100', name: 'Educación para la familia', year: 3, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11101', name: 'Programación IV', year: 3, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Ex. Final' },
  { code: '11102', name: 'Comunicación oral y escrita', year: 3, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11103', name: 'Redes y telecomunicaciones I', year: 3, period: 'Segundo Cuatrimestre', grade: 6, concept: 'Aprobado', modality: 'Ex. Final' },
  { code: '11104', name: 'Matemática superior', year: 3, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11105', name: 'Física IV', year: 3, period: 'Segundo Cuatrimestre', grade: 6, concept: 'Aprobado', modality: 'Ex. Final' },
  { code: '11106', name: 'Interpretación bíblica de la historia', year: 3, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },

  // Cuarto año
  { code: '11107', name: 'Administración de recursos informáticos I', year: 4, period: 'Primer Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
  { code: '11108', name: 'Redes y telecomunicaciones II', year: 4, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11109', name: 'Inteligencia artificial', year: 4, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11110', name: 'Estadística', year: 4, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11111', name: 'Cálculo numérico', year: 4, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11112', name: 'Ciencia y fe', year: 4, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11113', name: 'Sistemas operativos II', year: 4, period: 'Segundo Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Ex. Final' },
  { code: '11114', name: 'Administración de recursos informáticos II', year: 4, period: 'Segundo Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
  { code: '11115', name: 'Auditoría informática', year: 4, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Ex. Final' },
  { code: '11116', name: 'Robótica y domótica', year: 4, period: 'Segundo Cuatrimestre', status: 'Examen final' },
  { code: '11117', name: 'Administración financiera y económica', year: 4, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11118', name: 'Derecho informático', year: 4, period: 'Segundo Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11119', name: 'Filosofía de la educación cristiana', year: 4, period: 'Segundo Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
  { code: '11121', name: 'Liderazgo y negociación', year: 4, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },

  // Quinto año
  { code: '11124', name: 'Proyecto', year: 5, period: 'Anual', status: 'En curso' },
  { code: '11125', name: 'Práctica supervisada', year: 5, period: 'Anual', status: 'En curso' },
  { code: '11126', name: 'Administración de bases de datos', year: 5, period: 'Primer Cuatrimestre', grade: 8, concept: 'Muy Bueno', modality: 'Prom. Dir.' },
  { code: '11127', name: 'Ingeniería del software III', year: 5, period: 'Primer Cuatrimestre', status: 'En curso' },
  { code: '11128', name: 'Tecnologías informáticas emergentes', year: 5, period: 'Primer Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11129', name: 'Redes y telecomunicaciones III', year: 5, period: 'Primer Cuatrimestre', status: 'Examen final' },
  { code: '11130', name: 'Historia del cristianismo', year: 5, period: 'Primer Cuatrimestre', grade: 7, concept: 'Bueno', modality: 'Prom. Dir.' },
  { code: '11131', name: 'Sistemas de apoyo a la toma de decisiones', year: 5, period: 'Segundo Cuatrimestre', status: 'En curso' },
  { code: '11132', name: 'Sistemas de tiempo real', year: 5, period: 'Segundo Cuatrimestre', status: 'En curso' },
  { code: '11133', name: 'Ética y deontología profesional', year: 5, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11134', name: 'Modelos y simulaciones', year: 5, period: 'Segundo Cuatrimestre', grade: 9, concept: 'Distinguido', modality: 'Prom. Dir.' },
  { code: '11135', name: 'Movimientos religiosos contemporáneos', year: 5, period: 'Segundo Cuatrimestre', grade: 10, concept: 'Sobresaliente', modality: 'Prom. Dir.' },
]

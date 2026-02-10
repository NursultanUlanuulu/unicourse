export interface TestFileState {
  questionImageRequest: QuestionRequestFileState
  optionImageRequests: OptionFileState[]
}
export interface QuestionRequestFileState {
  subjectId: number
  description: string
  image: File | string
}
export interface OptionFileState {
  description: string
  image: File | string
  isCorrect: boolean
}

export interface TestState {
  questionRequest: QuestionRequestState
  optionRequests: OptionState[]
}
interface QuestionRequestState {
  subjectId: number
  description: string
}
interface OptionState {
  description: string
  isCorrect: boolean
}

export interface TestFileTextState {
  questionImageRequest: QuestionRequestFileTextState
  optionImageRequests: OptionFileTextState[]
}
export interface QuestionRequestFileTextState {
  subjectId: number
  description: string
  image: string | undefined
}
export interface OptionFileTextState {
  description: string
  image: string | undefined
  isCorrect: boolean
}

export interface QuestionReq {
  id: number
  questionId: number
  subjectId: number
  description: string
  image: string
  optionsResponse: OptionReq[]
}

export interface OptionReq {
  id: number
  questionId: number
  correct: boolean
  description: string
  image: string
}

export type InputProps = {
  main_image: File | null
  a_image: File | null
  b_image: File | null
  c_image: File | null
  d_image: File | null
}
export type OptionsInputState = {
  a: string
  b: string
  c: string
  d: string
}

export interface GetQuestionsListResponse {
  status: number | string
  message: string
}
export interface SubjectReq {
  id: number
  subjectName: string
  questionCount: number
  status: string
  message: string
}

export interface QuestionUpdateState {
  questionUpdateRequest: QuestionUpdate
  optionUpdateRequests: OptionUpdate[]
}
interface QuestionUpdate {
  questionId: number
  image: string | File
  description: string
}
interface OptionUpdate {
  optionId: number
  image: string | File
  description: string
  isCorrect: boolean
}
export interface SubjectPostReq {
  id?: number
  subjectName: string
  questionCount: number
  main: boolean
  countQuestionInTest: number
  time: number
  kgLanguage: boolean
}
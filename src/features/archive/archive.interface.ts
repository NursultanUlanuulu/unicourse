export interface ArchiveState {
    testId: number,
    subjectName: string,
}

export interface TestResult {
    correct: number
    notCorrect: number
    percent: number
    sumQuestion: number
    testId: number
}

export interface ResultQuestion {
    description: string
    image: string
    optionsResponse: ResultOption[]
    questionId: number
    subjectId: number
    testId: number
}

export interface ResultOption {
    chose: boolean
    correct: boolean
    description: string
    id: number
    image: string
    questionId: number
}
export interface Subject {
    id: number,
    subjectName: string,
    questionCount: number,
    main: boolean,
    countQuestionInTest: number,
    time: number,
    kgLanguage: boolean,
}
export interface QuestionState {
    description: string
    image: string
    optionsResponse: OptionState[]
    questionId:number
    subjectId:number
    testId:number
}

export interface OptionState {
    chose:boolean
    correct:boolean
    description:string
    id:number
    image:string
    questionId:number
}

export interface ResultState {
    correct: number
    notCorrect: number
    percent: number
    sumQuestion: number
    testId: number
}
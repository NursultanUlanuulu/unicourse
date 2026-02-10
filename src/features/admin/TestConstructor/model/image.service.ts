import { api } from "../api.ts"
import type { TestFileState, TestFileTextState, TestState } from "../type.ts"

export const uploadImageAndGetUrl = async (
  question: TestFileState,
): Promise<TestFileTextState> => {
  try {
    // Обработка изображения вопроса
    const questionImageUrl = question.questionImageRequest.image
  ? (question.questionImageRequest.image instanceof File
      ? await imageService(question.questionImageRequest.image)
      : undefined)
  : undefined

    // Обработка изображений вариантов ответа
    const optionImageUrls = await Promise.all(
      question.optionImageRequests.map(async (option) => {
        if (option.image && option.image instanceof File) {
          return await imageService(option.image)
        }
        return undefined
      }),
    )

    // Создаем новый объект с URL-ами изображений
    const newQuestion: TestFileTextState = {
      questionImageRequest: {
        ...question.questionImageRequest,
        image: questionImageUrl,
      },
      optionImageRequests: question.optionImageRequests.map(
        (option, index) => ({
          ...option,
          image: optionImageUrls[index],
        }),
      ),
    }
    return newQuestion
  } catch (err) {
    console.log(err)
    throw new Error("Ошибка загрузки изображений")
  }
}

// Функция для загрузки изображения и получения URL
const imageService = async (image: File): Promise<string> => {
  try {
    const res = await api.upload(image)
    if (res) {
      return res.data
    }
    throw new Error("Не удалось получить URL изображения")
  } catch (err) {
    console.log(err)
    throw new Error("Ошибка загрузки изображения")
  }
}

export const notImage = (question: TestFileState) => {
  const notImageQuestion: TestState = {
    questionRequest: {
      description: question.questionImageRequest.description,
      subjectId: question.questionImageRequest.subjectId,
    },
    optionRequests: question.optionImageRequests.map((x) => ({
      description: x.description,
      isCorrect: x.isCorrect,
    })),
  }
  return notImageQuestion
}

import { aiClient } from "@/lib/ai";
import { IVacancyAnalysisResponse } from "@/types/ai.types";
import { IDetailedVacancy } from "@/types/api.types";

const instruction = `Проанализируй вакансии по следующим полям: название позиции, компания, описание, требования. Верни результат в формате СТРОГО JSON со следующими метриками:
salary_range_estimate — оцени предполагаемый диапазон заработной платы для этой позиции на рынке труда в России (укажи город, если он есть в описании). Формат: «от X до Y ₽». Если данных недостаточно — «Недостаточно данных».
skills_match_score — определи, насколько требования и описание соответствуют востребованным на рынке навыкам для данной позиции. Используй шкалу от 0 до 1.
tech_stack_relevance_score — оцени актуальность стека технологий, указанного в требованиях, для 2026 года. Используй шкалу от 0 до 1.
clarity_score — оцени, насколько чётко и структурированно составлено описание вакансии и требования. Используй шкалу от 0 до 1.
summary — кратко опиши суть вакансии: уровень позиции, основные задачи, ключевые требования, особенности (например, удалёнка, тип занятости), общий вывод о привлекательности. Максимум 15 слов.`;

export async function getAIVacancyMetrics(vacancy: IDetailedVacancy) {
    const aiContent = JSON.stringify({
        title: vacancy.name,
        salary: vacancy.salary,
        snippet: vacancy.snippet,
        description: vacancy.description,
        skills: vacancy.key_skills,
    });

    const response = await aiClient.chat({
        messages: [
            {
                role: "system",
                content: instruction,
            },
            {
                role: "user",
                content: aiContent,
            },
        ],
    });

    const content = response.choices[0].message.content || "";

    try {
        const cleanJsonString = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanJsonString) as IVacancyAnalysisResponse;
    } catch (error) {
        console.error("Ошибка парсинга JSON от нейросети:", error);
        throw new Error("Нейросеть вернула некорректный формат данных");
    }
}

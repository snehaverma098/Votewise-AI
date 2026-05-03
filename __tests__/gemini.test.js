import { getGeminiResponse, checkMisinformation } from '../src/lib/gemini';

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: { text: () => 'Mocked response' }
      })
    })
  }))
}));

describe('Gemini API Integration', () => {
  it('should return a valid response from getGeminiResponse', async () => {
    const res = await getGeminiResponse('Hello');
    expect(res).toBe('Mocked response');
  });
});

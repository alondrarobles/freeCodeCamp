// __mocks__/monaco-editor.js

module.exports = {
    editor: {
      create: () => ({
        dispose: jest.fn(),
        getModel: jest.fn(() => ({
          dispose: jest.fn()
        })),
        onDidChangeModelContent: jest.fn(() => ({
          dispose: jest.fn()
        }))
      }),
      defineTheme: jest.fn(),
      setTheme: jest.fn()
    }
  };
  
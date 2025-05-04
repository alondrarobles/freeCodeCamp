import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemorySource, createHistory, LocationProvider } from '@gatsbyjs/reach-router';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { ShowClassic } from './show';

// Dummy reducers to prevent selector crashes
const challenge = () => ({
  modal: {
    completion: false,
    help: false,
    video: false,
    reset: false,
    exitExam: false
  }
});

const MainApp = () => ({
  appUsername: 'test-user',
  theme: 'default',
  userProfileFetchState: 'ready',
  user: {
    theme: 'default'
  }
});

const rootReducer = combineReducers({ challenge, MainApp });
const store = createStore(rootReducer);

function renderWithRouterAndStore(ui: React.ReactElement) {
  const history = createHistory(createMemorySource('/test-page'));
  return render(
    <Provider store={store}>
      <LocationProvider history={history}>{ui}</LocationProvider>
    </Provider>
  );
}

const mockProps = {
  challengeFiles: [],
  data: {
    challengeNode: {
      challenge: {
        block: 'test-block',
        blockType: 'step',
        blockLayout: 'classic',
        certification: 'responsive-web-design',
        challengeOrder: 1,
        challengeType: 3,
        dashedName: 'test-project',
        demoType: 'onClick',
        description: 'Test Description',
        instructions: 'Test Instructions. Your code is not automatically saved. Be sure to click the "Save your Code" button to save your progress.',
        helpCategory: 'html-css',
        forumTopicId: 123,
        fields: {
          tests: [],
          blockName: 'Test Block Name',
          blockHashSlug: '/learn/test-block',
          slug: 'test-project'
        },
        title: 'Test Project',
        hasEditableBoundaries: true,
        translationPending: false,
        notes: '',
        videoUrl: '',
        hooks: {},
        usesMultifileEditor: false,
        challengeFiles: [],
        required: [],
        explanation: '',
        fillInTheBlank: null,
        guideUrl: '',
        head: '',
        removeComments: false,
        removeHTML: false,
        removeJS: false,
        seed: [],
        solutions: [],
        style: '',
        tail: '',
        template: '',
        templateMetadata: [],
        testsOrder: [],
        type: 'html',
        isComingSoon: false,
        msTrophyId: null,
        prerequisites: [],
        isLocked: false,
        isPrivate: false,
        moduleType: 'certification',
        module: null,
        videoId: '',
        challengeTypeName: '',
        i18n: [],
        challengeIntroMarkdown: '',
        dashedNameFull: '',
        id: 'abc123',
        scene: '',
        sourceInstanceName: '',
        superOrder: 0,
        order: 0,
        topic: '',
        certificationId: '',
        allowComments: true,
        allowFeedback: true,
        usesQuestions: false,
        usesQuizzes: false,
        isPrivateSolutionAllowed: false,
        questions: [],
        quizzes: [],
        assignments: [],
        tests: []
      }
    }
  },
  pageContext: {
    challengeMeta: {
      id: 'abc123',
      isFirstStep: false,
      nextChallengePath: '/learn/next-step'
    },
    projectPreview: {
      challengeData: {}
    }
  },
  createFiles: jest.fn(),
  cancelTests: jest.fn(),
  challengeMounted: jest.fn(),
  initConsole: jest.fn(),
  initTests: jest.fn(),
  initHooks: jest.fn(),
  initVisibleEditors: jest.fn(),
  updateChallengeMeta: jest.fn(),
  openModal: jest.fn(),
  openExitQuizModal: jest.fn(),
  setIsAdvancing: jest.fn(),
  setEditorFocusability: jest.fn(),
  savedChallenges: [],
  isChallengeCompleted: false,
  output: [],
  executeChallenge: jest.fn(),
  previewMounted: jest.fn()
};

describe('ShowClassic', () => {
  it('shows a note telling users to manually save code', () => {
    render(<ShowClassic {...(mockProps as unknown as React.ComponentProps<typeof ShowClassic>)} />);

    expect(
      screen.getByText(/your code is not automatically saved/i)
    ).toBeInTheDocument();
  });
});

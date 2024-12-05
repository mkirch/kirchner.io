'use client';

import { type AnimationControls, motion, useAnimation } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

// biome-ignore lint/nursery/noSecrets: lol
const GLITCH_CHARS = '!<>-_\\/[]{}␆—=+␆*^␆?#___␆␆␆__';
const PREFIX = 'kirchner.io root$ ';
const COMMANDS = [
  'rm -rf /*',
  'gh repo clone mkirch/kirchner.io',
  'Now entering uncharted resources',
  '☣︎ Compendium Kirchnerianum ☣︎',
];

const PAUSE_DURATION = 100; // 0.1 seconds
const GLITCH_INTERVAL = 100; // 100 milliseconds

export const TerminalPrompt: React.FC = () => {
  const [prefixText, setPrefixText] = useState('');
  const [commandText, setCommandText] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [prefixGlitched, setPrefixGlitched] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cursorControls = useAnimation();
  const enterControls = useAnimation();

  const maxWidth = useMemo(() => {
    const longestCommand = COMMANDS.reduce((a, b) =>
      a.length > b.length ? a : b
    );
    return `${PREFIX.length + longestCommand.length + 2}ch`; // +2 for cursor and some padding
  }, []);

  const simulateEnterPress = useCallback(async () => {
    setShowCursor(false);
    await enterControls.start({
      opacity: [0, 1, 0],
      transition: { duration: 0.2, times: [0, 0.5, 1] },
    });
    setShowCursor(true);

    if (currentCommandIndex === COMMANDS.length - 1) {
      // If it's the last command, enter infinite pause without clearing the command
      setIsPaused(true);
    } else {
      setCommandText('');
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setCurrentCommandIndex((prevIndex) => prevIndex + 1);
      }, PAUSE_DURATION);
    }
  }, [enterControls, currentCommandIndex]);

  const simulateCommand = useCallback(() => {
    let iteration = 0;
    const currentCommand = COMMANDS[currentCommandIndex];

    const interval = setInterval(() => {
      setCommandText((prevText) => {
        const newText = currentCommand
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return currentCommand[index];
            }
            return GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ];
          })
          .join('');

        if (iteration >= currentCommand.length) {
          clearInterval(interval);
          simulateEnterPress();
        }

        iteration += 1 / 3;
        return newText;
      });
    }, GLITCH_INTERVAL);

    return () => clearInterval(interval);
  }, [currentCommandIndex, simulateEnterPress]);

  useEffect(() => {
    if (prefixGlitched || isPaused) {
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setPrefixText((prevText) => {
        const newText = PREFIX.split('')
          .map((char, index) => {
            if (index < iteration) {
              return PREFIX[index];
            }
            return GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ];
          })
          .join('');

        if (iteration >= PREFIX.length) {
          clearInterval(interval);
          setPrefixGlitched(true);
          simulateCommand();
        }

        iteration += 1 / 1;
        return newText;
      });
    }, GLITCH_INTERVAL);

    return () => clearInterval(interval);
  }, [prefixGlitched, isPaused, simulateCommand]);

  useEffect(() => {
    if (prefixGlitched && !isPaused) {
      simulateCommand();
    }
  }, [prefixGlitched, isPaused, simulateCommand]);

  useEffect(() => {
    const animateCursor = (controls: AnimationControls) => {
      controls.start({
        opacity: [1, 0],
        transition: {
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        },
      });
    };

    animateCursor(cursorControls);
  }, [cursorControls]);

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className="relative overflow-hidden whitespace-pre font-mono font-semibold text-green-500 text-lg md:text-xl lg:text-2xl"
        style={{ width: maxWidth }}
      >
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`scanline-${i}-${Math.random().toString(22).substring(2, 11)}`}
              className="h-[2px] w-full rounded-lg bg-black/20 blur-sm"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 inline-flex items-center whitespace-pre"
        >
          <span className="font-bold text-green-500">☠︎ </span>
          <span>{prefixText}</span>
          <span>{commandText}</span>
          {showCursor && (
            <motion.span
              className="ml-1 inline-block h-[1em] w-[2px] bg-green-500/75 align-middle"
              animate={cursorControls}
              initial={{ opacity: 0 }}
            />
          )}
          <motion.span
            className="ml-1 inline-block"
            animate={enterControls}
            initial={{ opacity: 0 }}
          >
            ↵
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

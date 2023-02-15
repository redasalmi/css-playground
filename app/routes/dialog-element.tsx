import * as React from 'react';
import { toCssValue } from '~/utils';

const animationsTypes = {
  showFromTop: 'open:animate-show-from-top',
  showFromBottom: 'open:animate-show-from-bottom',
  showFromCenter: 'open:animate-show-from-center',
  showFromButton: 'open:animate-show-from-button',
  hideToTop: 'animate-hide-to-top',
  hideToBottom: 'animate-hide-to-bottom',
  hideToCenter: 'animate-hide-to-center',
  hideToButton: 'animate-hide-to-button',
} as const;

const {
  showFromTop,
  showFromBottom,
  showFromCenter,
  showFromButton,
  hideToTop,
  hideToBottom,
  hideToCenter,
  hideToButton,
} = animationsTypes;

type AnimationKeys = keyof typeof animationsTypes;
type Animation = (typeof animationsTypes)[AnimationKeys];

function isAnimation(animation: any): animation is Animation {
  return Object.values(animationsTypes).includes(animation);
}

const animationsOptions = [
  { value: showFromTop, label: 'Show Dialog from Top' },
  { value: showFromBottom, label: 'Show Dialog from Bottom' },
  { value: showFromCenter, label: 'Show Dialog from Center' },
  { value: showFromButton, label: 'Show Dialog from Button' },
];

export default function DialogElementRoute() {
  const openBtnRef = React.useRef<HTMLButtonElement>(null!);
  const dialogRef = React.useRef<HTMLDialogElement>(null!);
  const dialogContentRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    let closeTimer: NodeJS.Timeout;
    const dialog = dialogRef.current;

    const clickOutside = (event: Event, preventDefault?: Boolean) => {
      if (preventDefault) {
        event.preventDefault();
      }

      const { target } = event;
      if (
        dialog.open &&
        target instanceof Node &&
        !dialogContentRef.current.contains(target)
      ) {
        if (dialog.classList.contains(showFromTop)) {
          updateDialogAnimation(hideToTop);
        } else if (dialog.classList.contains(showFromBottom)) {
          updateDialogAnimation(hideToBottom);
        } else if (dialog.classList.contains(showFromCenter)) {
          updateDialogAnimation(hideToCenter);
        } else if (dialog.classList.contains(showFromButton)) {
          updateDialogAnimation(hideToButton);
        }

        closeTimer = setTimeout(() => {
          dialog.close();
          document.body.style.overflow = 'initial';
        }, 290);
      }
    };

    document.body.addEventListener('click', clickOutside);
    dialog.addEventListener('cancel', (event) => clickOutside(event, true));

    return () => {
      document.body.removeEventListener('click', clickOutside);
      dialog.removeEventListener('cancel', clickOutside);
      clearTimeout(closeTimer);
    };
  }, []);

  const openDialog = () => {
    const dialog = dialogRef.current;
    document.body.style.overflow = 'hidden';

    if (dialog.classList.contains(hideToTop)) {
      updateDialogAnimation(showFromTop);
    } else if (dialog.classList.contains(hideToBottom)) {
      updateDialogAnimation(showFromBottom);
    } else if (dialog.classList.contains(hideToCenter)) {
      updateDialogAnimation(showFromCenter);
    } else if (dialog.classList.contains(hideToButton)) {
      updateDialogAnimation(showFromButton);
    }

    dialog.showModal();
  };

  const updateDialogAnimation = (animation: Animation) => {
    const dialog = dialogRef.current;
    const openBtn = openBtnRef.current;

    const { top, left, width, height } = openBtn.getBoundingClientRect();
    dialog.style.setProperty('--btn-top', toCssValue(top));
    dialog.style.setProperty('--btn-left', toCssValue(left));
    dialog.style.setProperty('--btn-width', toCssValue(width));
    dialog.style.setProperty('--btn-height', toCssValue(height));

    dialog.classList.remove(...Object.values(animationsTypes));
    dialog.classList.add(animation);
  };

  const handleAnimationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const animation = event.target.value;
    if (isAnimation(animation)) {
      updateDialogAnimation(animation);
    }
  };

  return (
    <div className="container mx-auto">
      <button
        ref={openBtnRef}
        onClick={() => openDialog()}
        className="h-10 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Open Dialog
      </button>
      <select
        className="ml-4 h-10 rounded-md bg-blue-500 px-4 py-2 text-white"
        onChange={handleAnimationChange}
      >
        {animationsOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <dialog
        ref={dialogRef}
        className={`absolute inset-0 m-auto h-96 w-96 rounded-md p-0 shadow backdrop:bg-gray-400 backdrop:bg-opacity-70 ${showFromTop}`}
      >
        <div ref={dialogContentRef} className="h-full p-2" />
      </dialog>
    </div>
  );
}

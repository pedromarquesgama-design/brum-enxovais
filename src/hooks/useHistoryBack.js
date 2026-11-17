import { useEffect, useRef } from 'react';

// Pilha LIFO para garantir que o botão Voltar (Android/navegador) feche apenas
// o modal/drawer mais recente em vez de fechar ou sair do site.
const backStack = [];
let listenerAttached = false;

function handlePopState() {
  if (backStack.length === 0) return;
  const top = backStack.pop();
  top?.onClose?.();
}

function ensureListener() {
  if (listenerAttached || typeof window === 'undefined') return;
  window.addEventListener('popstate', handlePopState);
  listenerAttached = true;
}

export function useHistoryBack(isOpen, onClose) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return undefined;

    ensureListener();
    const token = Symbol('modal-back');
    backStack.push({
      token,
      onClose: () => onCloseRef.current?.(),
    });

    window.history.pushState({ ...window.history.state, __brumModal: true }, '');

    return () => {
      const idx = backStack.findIndex((entry) => entry.token === token);
      if (idx !== -1) {
        backStack.splice(idx, 1);
        window.history.back();
      }
    };
  }, [isOpen]);
}

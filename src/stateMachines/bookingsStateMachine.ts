/**import { createMachine, assign } from 'xstate';

export const wizardMachine = createMachine(
  {
    id: 'wizard',
    initial: 'guest_checkout',
    context: {
      user: null,
      selectedClassType: null,
      selectedDate: null,
      selectedPassType: null,
      selectedPrivateDateTime: null,
      selectedEmail: "",
      selectedAmount: 0,
    },
    states: {
      // State
      registered_checkout: {
        on: {
          weekly_class_selected: { target: 'weekly_class_selected' },
          pass_selected: { target: 'pass_selected' },
          private_selected: { target: 'private_selected' },
        },
      },
      // State
      guest_checkout: {
        on: {
          weekly_class_selected: { target: 'weekly_class_selected' },
          pass_selected: { target: 'pass_selected' },
          private_selected: { target: 'private_selected' },
        },
      },
      // Sub-State
      weekly_class_selected: {
        on: {
          validate: [
            { target: 'next_disabled', guard: 'isWeeklyClassInvalid' },
            { target: 'next_enabled' }
          ]
        }
      },
      // Sub-State
      pass_selected: {
        on: {
          validate: [
            { target: 'next_disabled', guard: 'isPassInvalid' },
            { target: 'next_enabled' }
          ]
        }
      },
      // Sub-State
      private_selected: {
        on: {
          validate: [
            { target: 'next_disabled', guard: 'isPrivateInvalid' },
            { target: 'next_enabled' }
          ]
        }
      },
      next_disabled: {},
      next_enabled: {},
    }
  },
  {
    guards: {
      isWeeklyClassInvalid: ({ context }) =>
        context.selectedClassType === null ||
        context.selectedDate === null ||
        context.selectedAmount === 0 ||
        (context.user === null && context.selectedEmail === ""),
      isPassInvalid: ({ context }) =>
        context.selectedPassType === null ||
        context.selectedAmount === 0 ||
        (context.user === null && context.selectedEmail === ""),
      isPrivateInvalid: ({ context }) =>
        context.selectedPrivateDateTime === null ||
        (context.user === null && context.selectedEmail === ""),
    }
  }
); **/

export type StartupMessage = {
  type: "startup";
};

export type PingMessage = {
  type: "ping";
};

export type PinMessage =
  | {
      type: "pin";
      action: "set";
      pin: number;
      value: boolean;
    }
  | {
      type: "pin";
      action: "toggle" | "read" | "pwm_stop";
      pin: number;
    }
  | {
      type: "pin";
      action: "pwm_set";
      pin: number;
      duty_cycle: number;
      frequency?: number;
    };

export type I2CMessage =
  | {
      type: "i2c";
      action: "scan";
    }
  | {
      type: "i2c";
      action: "read_byte";
      address: number;
    }
  | {
      type: "i2c";
      action: "write_byte";
      address: number;
      value: number;
    }
  | {
      type: "i2c";
      action: "read_register";
      address: number;
      register: number;
    }
  | {
      type: "i2c";
      action: "write_register";
      address: number;
      register: number;
      value: number;
    }
  | {
      type: "i2c";
      action: "read_block";
      address: number;
      register: number;
      length: number;
    }
  | {
      type: "i2c";
      action: "write_block";
      address: number;
      register: number;
      data: number[];
    };

export type ShellStartMessage = {
  type: "shell_start";
};

export type ShellInputMessage = {
  type: "shell_input";
  data: string;
};

export type ShellMessage = ShellStartMessage | ShellInputMessage;

export type WebSocketMessage =
  | StartupMessage
  | PingMessage
  | PinMessage
  | I2CMessage
  | ShellMessage;
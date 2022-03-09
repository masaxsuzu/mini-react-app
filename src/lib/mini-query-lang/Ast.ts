export type LogicalOperatorType = "&" | "|";
export type RangeOperatorType = "<" | "<=" | "=" | ">=" | ">";

export class Query {
  constructor(public expression: Expression) {}
}

export interface Expression {
  eval(source: Map<string, number>): boolean;
}

export class LogicalExpression implements Expression {
  public constructor(
    public op: LogicalOperatorType,
    public left: Expression,
    public right: Expression
  ) {}
  eval(source: Map<string, number>): boolean {
    const lhs = this.left.eval(source);
    const rhs = this.right.eval(source);
    switch (this.op) {
      case "&":
        return lhs && rhs;
      case "|":
      default:
        return lhs || rhs;
    }
  }
}

export class RangeExpression implements Expression {
  constructor(
    public op: RangeOperatorType,
    public left: string,
    public right: number
  ) {}
  eval(source: Map<string, number>): boolean {
    const x = source.get(this.left);
    if (x === undefined) {
      return false;
    }
    switch (this.op) {
      case "<":
        return x < this.right;
      case "<=":
        return x <= this.right;
      case ">":
        return x > this.right;
      case ">=":
        return x >= this.right;
      case "=":
      default:
        return x === this.right;
    }
  }
}

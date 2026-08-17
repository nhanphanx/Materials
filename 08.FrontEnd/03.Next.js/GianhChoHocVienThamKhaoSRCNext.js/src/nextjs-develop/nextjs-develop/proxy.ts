import { NextResponse } from 'next/server';

export function proxy() {

  return NextResponse.next();
}

// Export for use in next.config.js or as custom server
export default proxy;


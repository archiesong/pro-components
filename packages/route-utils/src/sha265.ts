/*
 * A JavaScript implementation of the SHA256 hash function.
 *
 * FILE:  sha256.js
 * VERSION: 0.8
 * AUTHOR:  Christoph Bichlmeier <informatik@zombiearena.de>
 *
 * NOTE: This version is not tested thoroughly!
 *
 * Copyright (c) 2003, Christoph Bichlmeier
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * ======================================================================
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS
 * OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* SHA256 logical functions */
function rotateRight(n: number, x: number) {
  return (x >>> n) | (x << (32 - n))
}
function choice(x: number, y: number, z: number) {
  return (x & y) ^ (~x & z)
}
function majority(x: number, y: number, z: number) {
  return (x & y) ^ (x & z) ^ (y & z)
}
function sha256_Sigma0(x: any) {
  return rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x)
}
function sha256_Sigma1(x: any) {
  return rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x)
}
function sha256_sigma0(x: number) {
  return rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3)
}
function sha256_sigma1(x: number) {
  return rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10)
}
function sha256_expand(W: any[], j: number) {
  return (W[j & 0x0F]
    += sha256_sigma1(W[(j + 14) & 0x0F]) + W[(j + 9) & 0x0F] + sha256_sigma0(W[(j + 1) & 0x0F]))
}

/* Hash constant words K: */
const K256 = [
  0x428A2F98,
  0x71374491,
  0xB5C0FBCF,
  0xE9B5DBA5,
  0x3956C25B,
  0x59F111F1,
  0x923F82A4,
  0xAB1C5ED5,
  0xD807AA98,
  0x12835B01,
  0x243185BE,
  0x550C7DC3,
  0x72BE5D74,
  0x80DEB1FE,
  0x9BDC06A7,
  0xC19BF174,
  0xE49B69C1,
  0xEFBE4786,
  0x0FC19DC6,
  0x240CA1CC,
  0x2DE92C6F,
  0x4A7484AA,
  0x5CB0A9DC,
  0x76F988DA,
  0x983E5152,
  0xA831C66D,
  0xB00327C8,
  0xBF597FC7,
  0xC6E00BF3,
  0xD5A79147,
  0x06CA6351,
  0x14292967,
  0x27B70A85,
  0x2E1B2138,
  0x4D2C6DFC,
  0x53380D13,
  0x650A7354,
  0x766A0ABB,
  0x81C2C92E,
  0x92722C85,
  0xA2BFE8A1,
  0xA81A664B,
  0xC24B8B70,
  0xC76C51A3,
  0xD192E819,
  0xD6990624,
  0xF40E3585,
  0x106AA070,
  0x19A4C116,
  0x1E376C08,
  0x2748774C,
  0x34B0BCB5,
  0x391C0CB3,
  0x4ED8AA4A,
  0x5B9CCA4F,
  0x682E6FF3,
  0x748F82EE,
  0x78A5636F,
  0x84C87814,
  0x8CC70208,
  0x90BEFFFA,
  0xA4506CEB,
  0xBEF9A3F7,
  0xC67178F2,
]

/**
 * global arrays
 */
let ihash: any[]
let count: any[]
let buffer: any[]
const sha256_hex_digits = '0123456789abcdef'

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
overflow) */
function safe_add(x: number, y: number) {
  const lsw = (x & 0xFFFF) + (y & 0xFFFF)
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xFFFF)
}

/* Initialise the SHA256 computation */
function sha256_init() {
  ihash = Array.from({ length: 8 })
  count = Array.from({ length: 2 })
  buffer = Array.from({ length: 64 })
  count[0] = count[1] = 0
  ihash[0] = 0x6A09E667
  ihash[1] = 0xBB67AE85
  ihash[2] = 0x3C6EF372
  ihash[3] = 0xA54FF53A
  ihash[4] = 0x510E527F
  ihash[5] = 0x9B05688C
  ihash[6] = 0x1F83D9AB
  ihash[7] = 0x5BE0CD19
}

/* Transform a 512-bit message block */
function sha256_transform() {
  let a
  let b
  let c
  let d
  let e
  let f
  let g
  let h
  let T1
  let T2
  const W = Array.from({ length: 16 })

  /* Initialize registers with the previous intermediate value */
  a = ihash[0]
  b = ihash[1]
  c = ihash[2]
  d = ihash[3]
  e = ihash[4]
  f = ihash[5]
  g = ihash[6]
  h = ihash[7]

  /* make 32-bit words */
  for (let i = 0; i < 16; i++) {
    W[i]
      = buffer[(i << 2) + 3]
        | (buffer[(i << 2) + 2] << 8)
        | (buffer[(i << 2) + 1] << 16)
        | (buffer[i << 2] << 24)
  }

  for (let j = 0; j < 64; j++) {
    T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j]
    if (j < 16)
      T1 += W[j]
    else T1 += sha256_expand(W, j)
    T2 = sha256_Sigma0(a) + majority(a, b, c)
    h = g
    g = f
    f = e
    e = safe_add(d, T1)
    d = c
    c = b
    b = a
    a = safe_add(T1, T2)
  }

  /* Compute the current intermediate hash value */
  ihash[0] += a
  ihash[1] += b
  ihash[2] += c
  ihash[3] += d
  ihash[4] += e
  ihash[5] += f
  ihash[6] += g
  ihash[7] += h
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data: string, inputLen: number) {
  let i
  let index
  let curpos = 0
  /* Compute number of bytes mod 64 */
  index = (count[0] >> 3) & 0x3F
  const remainder = inputLen & 0x3F

  /* Update number of bits */
  if ((count[0] += inputLen << 3) < inputLen << 3)
    count[1]++
  count[1] += inputLen >> 29

  /* Transform as many times as possible */
  for (i = 0; i + 63 < inputLen; i += 64) {
    for (let j = index; j < 64; j++) buffer[j] = data.charCodeAt(curpos++)
    sha256_transform()
    index = 0
  }

  /* Buffer remaining input */
  for (let j = 0; j < remainder; j++) buffer[j] = data.charCodeAt(curpos++)
}

/* Finish the computation by operations such as padding */
function sha256_final() {
  let index = (count[0] >> 3) & 0x3F
  buffer[index++] = 0x80
  if (index <= 56) {
    for (let i = index; i < 56; i++) buffer[i] = 0
  }
  else {
    for (let i = index; i < 64; i++) buffer[i] = 0
    sha256_transform()
    for (let i = 0; i < 56; i++) buffer[i] = 0
  }
  buffer[56] = (count[1] >>> 24) & 0xFF
  buffer[57] = (count[1] >>> 16) & 0xFF
  buffer[58] = (count[1] >>> 8) & 0xFF
  buffer[59] = count[1] & 0xFF
  buffer[60] = (count[0] >>> 24) & 0xFF
  buffer[61] = (count[0] >>> 16) & 0xFF
  buffer[62] = (count[0] >>> 8) & 0xFF
  buffer[63] = count[0] & 0xFF
  sha256_transform()
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
  let j = 0
  const output = Array.from({ length: 32 })
  for (let i = 0; i < 8; i++) {
    output[j++] = (ihash[i] >>> 24) & 0xFF
    output[j++] = (ihash[i] >>> 16) & 0xFF
    output[j++] = (ihash[i] >>> 8) & 0xFF
    output[j++] = ihash[i] & 0xFF
  }
  return output
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
  let output = String()
  for (let i = 0; i < 8; i++) {
    for (let j = 28; j >= 0; j -= 4) output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0F)
  }
  return output
}

/* Main function: returns a hex string representing the SHA256 value of the
given data */
function digest(data: string) {
  sha256_init()
  sha256_update(data, data.length)
  sha256_final()
  return sha256_encode_hex()
}

export { sha256_encode_bytes }
export default digest

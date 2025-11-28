import { styled } from '@mui/material';
import { useState } from 'react';

interface ColorPaletteProps {
    palette: string[];
}

// simple luminance-based contrast: if bg is dark, use white text; if light, use black
const getContrastColor = (hexBg: string): string => {
    try {
        const hex = hexBg.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        // relative luminance formula
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    } catch (err) {
        console.warn('getContrastColor failed for', hexBg, err);
        return '#000000';
    }
};

const ColorPalette = ({ palette }: ColorPaletteProps) => {
    const [paletteExpand, setPaletteExpand] = useState<boolean>(false);

    return (
        <Wrapper
            paletteExpand={paletteExpand}
            onClick={() => {
                if (!paletteExpand) {
                    setPaletteExpand(true);
                }
            }}
        >
            {palette.map((hexValue, i) => {
                const textColor = getContrastColor(hexValue);

                return (
                    <ColorSquare
                        key={`item-${Date.now()}-${i}`}
                        hexValue={hexValue}
                        paletteExpand={paletteExpand}
                    >
                        {paletteExpand && (
                            <HexCode color={textColor}>{hexValue}</HexCode>
                        )}
                    </ColorSquare>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled('div')(
    ({ paletteExpand }: { paletteExpand: boolean }) => ({
        display: 'flex',
        flexDirection: paletteExpand ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',
    })
);

const ColorSquare = styled('div')(
    ({
        hexValue,
        paletteExpand,
    }: {
        hexValue: string;
        paletteExpand: boolean;
    }) => ({
        backgroundColor: hexValue,
        height: '2rem',
        width: paletteExpand ? '8rem' : '2rem',
    })
);

const HexCode = styled('span')(({ color }: { color: string }) => ({
    color: color,
}));

export default ColorPalette;

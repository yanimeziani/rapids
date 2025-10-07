/**
 * RAPIDS v4.0.0-beta.1 - Template Command
 * Code generation from templates
 */

import React, { useState, useEffect } from 'react';
import { render, Text, Box, Newline } from 'ink';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

interface Template {
  name: string;
  description: string;
  targetDir: string;
  fileExtensions: string[];
}

interface SelectOption {
  label: string;
  value: string;
}

type TemplateMode =
  | 'loading'
  | 'select-template'
  | 'input-name'
  | 'generating'
  | 'done'
  | 'error';

const TEMPLATES: Record<string, Template> = {
  'mobile-feature': {
    name: 'mobile-feature',
    description: 'Flutter feature with Riverpod state management',
    targetDir: 'lib/features',
    fileExtensions: ['.dart']
  },
  'backend-api': {
    name: 'backend-api',
    description: 'FastAPI endpoint with SQLAlchemy model',
    targetDir: 'app/api',
    fileExtensions: ['.py']
  },
  'web-page': {
    name: 'web-page',
    description: 'Next.js 15 page with App Router',
    targetDir: 'app',
    fileExtensions: ['.tsx', '.ts']
  },
  'design-system': {
    name: 'design-system',
    description: 'Material Design 3 component',
    targetDir: 'components',
    fileExtensions: ['.tsx', '.dart']
  }
};

function TemplateGenerator({
  templateType,
  featureName
}: {
  templateType?: string;
  featureName?: string;
}) {
  const [mode, setMode] = useState<TemplateMode>('loading');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    templateType || ''
  );
  const [name, setName] = useState<string>(featureName || '');
  const [error, setError] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);

  const promptsDir = path.join(os.homedir(), '.claude', 'prompts');

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      // Check if RAPIDS is installed
      if (!(await fs.pathExists(promptsDir))) {
        setError('RAPIDS not installed. Run `npm install -g rapids-ai` first.');
        setMode('error');
        return;
      }

      if (templateType && featureName) {
        // Direct generation
        await generateTemplate(templateType, featureName);
      } else if (templateType) {
        // Has template, need name
        setMode('input-name');
      } else {
        // Need both
        setMode('select-template');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Initialization failed');
      setMode('error');
    }
  };

  const generateTemplate = async (templateName: string, entityName: string) => {
    try {
      setMode('generating');
      setSelectedTemplate(templateName);
      setName(entityName);

      const template = TEMPLATES[templateName];
      if (!template) {
        setError(`Template "${templateName}" not found`);
        setMode('error');
        return;
      }

      // Load template from prompts directory
      const templatePath = path.join(promptsDir, `${templateName}.md`);
      if (!(await fs.pathExists(templatePath))) {
        setError(`Template file not found: ${templatePath}`);
        setMode('error');
        return;
      }

      const templateContent = await fs.readFile(templatePath, 'utf-8');

      // Generate files based on template type
      const files = await generateFilesFromTemplate(
        template,
        entityName,
        templateContent
      );

      setGeneratedFiles(files);
      setMode('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Template generation failed');
      setMode('error');
    }
  };

  const generateFilesFromTemplate = async (
    template: Template,
    entityName: string,
    templateContent: string
  ): Promise<string[]> => {
    const files: string[] = [];

    // Convert entity name to different formats
    const entityNamePascal = toPascalCase(entityName);
    const entityNameSnake = toSnakeCase(entityName);
    const entityNameKebab = toKebabCase(entityName);

    switch (template.name) {
      case 'mobile-feature':
        files.push(
          await createMobileFeature(entityNameSnake, entityNamePascal, templateContent)
        );
        break;

      case 'backend-api':
        files.push(
          await createBackendAPI(entityNameSnake, entityNamePascal, templateContent)
        );
        break;

      case 'web-page':
        files.push(
          await createWebPage(entityNameKebab, entityNamePascal, templateContent)
        );
        break;

      case 'design-system':
        files.push(
          await createDesignComponent(entityNamePascal, templateContent)
        );
        break;
    }

    return files;
  };

  const createMobileFeature = async (
    nameSnake: string,
    namePascal: string,
    template: string
  ): Promise<string> => {
    const featureDir = path.join(process.cwd(), 'lib', 'features', nameSnake);
    await fs.ensureDir(featureDir);
    await fs.ensureDir(path.join(featureDir, 'application'));
    await fs.ensureDir(path.join(featureDir, 'domain', 'models'));
    await fs.ensureDir(path.join(featureDir, 'presentation', 'widgets'));
    await fs.ensureDir(path.join(featureDir, 'repositories'));

    // Create screen file
    const screenPath = path.join(
      featureDir,
      'presentation',
      `${nameSnake}_screen.dart`
    );

    const screenContent = `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ${namePascal}Screen extends ConsumerWidget {
  const ${namePascal}Screen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${namePascal}'),
      ),
      body: Center(
        child: Text('${namePascal} Feature'),
      ),
    );
  }
}
`;

    await fs.writeFile(screenPath, screenContent);

    // Create controller file
    const controllerPath = path.join(
      featureDir,
      'application',
      `${nameSnake}_controller.dart`
    );

    const controllerContent = `import 'package:flutter_riverpod/flutter_riverpod.dart';

final ${toSnakeCase(namePascal)}ControllerProvider =
    StateNotifierProvider<${namePascal}Controller, ${namePascal}State>((ref) {
  return ${namePascal}Controller();
});

class ${namePascal}Controller extends StateNotifier<${namePascal}State> {
  ${namePascal}Controller() : super(${namePascal}State.initial());

  // Add methods here
}

class ${namePascal}State {
  const ${namePascal}State();

  factory ${namePascal}State.initial() => const ${namePascal}State();
}
`;

    await fs.writeFile(controllerPath, controllerContent);

    return `Generated Flutter feature at: ${featureDir}`;
  };

  const createBackendAPI = async (
    nameSnake: string,
    namePascal: string,
    template: string
  ): Promise<string> => {
    const apiDir = path.join(process.cwd(), 'app', 'api', nameSnake);
    await fs.ensureDir(apiDir);

    // Create router file
    const routerPath = path.join(apiDir, 'router.py');
    const routerContent = `from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from . import schemas, crud

router = APIRouter(prefix="/${nameSnake}", tags=["${nameSnake}"])

@router.get("/", response_model=List[schemas.${namePascal}])
async def get_${nameSnake}(db: AsyncSession = Depends(get_db)):
    """Get all ${nameSnake}"""
    return await crud.get_all(db)

@router.get("/{id}", response_model=schemas.${namePascal})
async def get_${nameSnake}_by_id(id: int, db: AsyncSession = Depends(get_db)):
    """Get ${nameSnake} by ID"""
    result = await crud.get_by_id(db, id)
    if not result:
        raise HTTPException(status_code=404, detail="${namePascal} not found")
    return result

@router.post("/", response_model=schemas.${namePascal}, status_code=201)
async def create_${nameSnake}(
    data: schemas.${namePascal}Create,
    db: AsyncSession = Depends(get_db)
):
    """Create new ${nameSnake}"""
    return await crud.create(db, data)
`;

    await fs.writeFile(routerPath, routerContent);

    // Create schemas file
    const schemasPath = path.join(apiDir, 'schemas.py');
    const schemasContent = `from pydantic import BaseModel
from datetime import datetime

class ${namePascal}Base(BaseModel):
    name: str

class ${namePascal}Create(${namePascal}Base):
    pass

class ${namePascal}(${namePascal}Base):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
`;

    await fs.writeFile(schemasPath, schemasContent);

    // Create CRUD file
    const crudPath = path.join(apiDir, 'crud.py');
    const crudContent = `from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional

from app.models.${nameSnake} import ${namePascal}
from . import schemas

async def get_all(db: AsyncSession) -> List[${namePascal}]:
    result = await db.execute(select(${namePascal}))
    return result.scalars().all()

async def get_by_id(db: AsyncSession, id: int) -> Optional[${namePascal}]:
    result = await db.execute(select(${namePascal}).where(${namePascal}.id == id))
    return result.scalar_one_or_none()

async def create(db: AsyncSession, data: schemas.${namePascal}Create) -> ${namePascal}:
    obj = ${namePascal}(**data.model_dump())
    db.add(obj)
    await db.commit()
    await db.refresh(obj)
    return obj
`;

    await fs.writeFile(crudPath, crudContent);

    return `Generated FastAPI endpoint at: ${apiDir}`;
  };

  const createWebPage = async (
    nameKebab: string,
    namePascal: string,
    template: string
  ): Promise<string> => {
    const pageDir = path.join(process.cwd(), 'app', nameKebab);
    await fs.ensureDir(pageDir);

    // Create page file
    const pagePath = path.join(pageDir, 'page.tsx');
    const pageContent = `export default function ${namePascal}Page() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">${namePascal}</h1>
      <p>Welcome to the ${namePascal} page.</p>
    </div>
  );
}
`;

    await fs.writeFile(pagePath, pageContent);

    return `Generated Next.js page at: ${pageDir}`;
  };

  const createDesignComponent = async (
    namePascal: string,
    template: string
  ): Promise<string> => {
    const componentsDir = path.join(process.cwd(), 'components');
    await fs.ensureDir(componentsDir);

    const componentPath = path.join(componentsDir, `${namePascal}.tsx`);
    const componentContent = `interface ${namePascal}Props {
  // Add props here
}

export function ${namePascal}({}: ${namePascal}Props) {
  return (
    <div>
      {/* Material Design 3 component */}
    </div>
  );
}
`;

    await fs.writeFile(componentPath, componentContent);

    return `Generated component at: ${componentPath}`;
  };

  const handleTemplateSelect = (item: SelectOption) => {
    setSelectedTemplate(item.value);
    setMode('input-name');
  };

  const handleNameSubmit = async () => {
    if (name.trim()) {
      await generateTemplate(selectedTemplate, name.trim());
    }
  };

  // Utility functions
  function toPascalCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
      .replace(/[\s-_]+/g, '');
  }

  function toSnakeCase(str: string): string {
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '');
  }

  function toKebabCase(str: string): string {
    return str
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '');
  }

  if (mode === 'loading') {
    return (
      <Box padding={1}>
        <Text color="cyan">
          <Spinner type="dots" /> Loading templates...
        </Text>
      </Box>
    );
  }

  if (mode === 'error') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red" bold>
          ❌ Error
        </Text>
        <Newline />
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  if (mode === 'select-template') {
    const options: SelectOption[] = Object.values(TEMPLATES).map((template) => ({
      label: `${template.name} - ${template.description}`,
      value: template.name
    }));

    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          📝 RAPIDS Template Generator
        </Text>
        <Newline />
        <Text dimColor>Select a template:</Text>
        <Newline />
        <SelectInput items={options} onSelect={handleTemplateSelect} />
        <Newline />
        <Text dimColor>
          Usage: rapids template &lt;type&gt; &lt;name&gt;
        </Text>
      </Box>
    );
  }

  if (mode === 'input-name') {
    const template = TEMPLATES[selectedTemplate];

    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          📝 Generate {template.name}
        </Text>
        <Newline />
        <Text dimColor>{template.description}</Text>
        <Newline />
        <Text>Enter feature/component name:</Text>
        <Box marginTop={1}>
          <Text color="cyan">▶ </Text>
          <TextInput value={name} onChange={setName} onSubmit={handleNameSubmit} />
        </Box>
        <Newline />
        <Text dimColor>
          Example: UserProfile, OrderHistory, ProductCard
        </Text>
      </Box>
    );
  }

  if (mode === 'generating') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="cyan">
          <Spinner type="dots" /> Generating {selectedTemplate} for {name}...
        </Text>
      </Box>
    );
  }

  if (mode === 'done') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="green">
          ✅ Template Generated Successfully!
        </Text>
        <Newline />
        <Box
          flexDirection="column"
          borderStyle="round"
          borderColor="cyan"
          padding={1}
        >
          <Text bold>Template: {selectedTemplate}</Text>
          <Text bold>Name: {name}</Text>
          <Newline />
          <Text dimColor>Files created:</Text>
          {generatedFiles.map((file, idx) => (
            <Text key={idx}>  • {file}</Text>
          ))}
        </Box>
        <Newline />
        <Text dimColor>
          Next steps:
        </Text>
        <Text dimColor>
          1. Review and customize the generated files
        </Text>
        <Text dimColor>
          2. Add to router/imports if needed
        </Text>
        <Text dimColor>
          3. Run tests and commit
        </Text>
      </Box>
    );
  }

  return null;
}

export async function templateCommand(
  templateName?: string,
  featureName?: string
): Promise<void> {
  render(<TemplateGenerator templateType={templateName} featureName={featureName} />);
}

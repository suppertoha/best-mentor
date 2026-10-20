import { CreateChapterForm } from '@/features/chapter-create';
import { EditChapterForm } from '@/features/chapter-edit';
import { CreateSectionForm } from '@/features/section-create';
import { EditSectionForm } from '@/features/section-edit';
import { Modal } from '@/shared/ui';
import type { Chapter, Section } from '../../model/types';

interface SectionsAdminModalsProps {
  isCreateSectionOpen: boolean;
  onCloseCreateSection: () => void;
  onSectionCreated: () => void;
  editingSection: Section | null;
  onCloseEditSection: () => void;
  onSectionUpdated: () => void;
  creatingChapterSectionId: number | null;
  creatingChapterSectionChapters?: Chapter[];
  onCloseCreateChapter: () => void;
  onChapterCreated: () => void;
  editingChapter: Chapter | null;
  onCloseEditChapter: () => void;
  onChapterUpdated: () => void;
}

export const SectionsAdminModals = ({
  isCreateSectionOpen,
  onCloseCreateSection,
  onSectionCreated,
  editingSection,
  onCloseEditSection,
  onSectionUpdated,
  creatingChapterSectionId,
  creatingChapterSectionChapters = [],
  onCloseCreateChapter,
  onChapterCreated,
  editingChapter,
  onCloseEditChapter,
  onChapterUpdated,
}: SectionsAdminModalsProps) => (
  <>
    <Modal isOpen={isCreateSectionOpen} onClose={onCloseCreateSection} title="Добавить раздел">
      <CreateSectionForm onSuccess={onSectionCreated} />
    </Modal>

    <Modal
      isOpen={editingSection !== null}
      onClose={onCloseEditSection}
      title="Редактировать раздел"
    >
      {editingSection && (
        <EditSectionForm
          key={editingSection.id}
          section={editingSection}
          onSuccess={onSectionUpdated}
        />
      )}
    </Modal>

    <Modal
      isOpen={creatingChapterSectionId !== null}
      onClose={onCloseCreateChapter}
      title="Добавить главу"
    >
      {creatingChapterSectionId !== null && (
        <CreateChapterForm
          key={creatingChapterSectionId}
          sectionId={creatingChapterSectionId}
          existingChapters={creatingChapterSectionChapters}
          onSuccess={onChapterCreated}
        />
      )}
    </Modal>

    <Modal isOpen={editingChapter !== null} onClose={onCloseEditChapter} title="Название и slug">
      {editingChapter && (
        <EditChapterForm
          key={editingChapter.id}
          chapter={editingChapter}
          onSuccess={onChapterUpdated}
        />
      )}
    </Modal>
  </>
);
